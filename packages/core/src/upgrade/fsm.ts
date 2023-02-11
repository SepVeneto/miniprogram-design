import { CoreDataV1 } from '.';
abstract class Context {
  abstract setVersion(state: any): void
  abstract data: Record<PropertyKey, unknown>
}
type CoreData = CoreDataV1
interface State {
  readonly VERSION: string
  origin: CoreData

}

class StateV1 implements State {
  readonly VERSION = '1.0';
  private context: Context;
  origin: CoreDataV1;
  constructor (context: Context) {
    this.context = context;
    this.origin = this.context.data as CoreDataV1;
  }

  public updateVersion () {
    this.upgrade();
    this.context.setVersion(new StateV11(this.context));
  }

  @shouldUpdate
  public upgrade () {
    this.origin.version = '1.0';
  }
}

class StateV11 implements State {
  private context: Context;
  readonly VERSION = '1.1';
  origin: CoreDataV1;
  constructor (context: Context) {
    this.context = context;
    this.origin = this.context.data as CoreDataV1;
  }

  @shouldUpdate
  private upgrade () {
    const body = this.bodyLetterToUpper();
    const tabbarList = this.tabbarTypeName();
    this.origin.body = body;
    this.origin.tabbars.list = tabbarList;
    this.origin.version = '1.1';
  }

  public updateVersion () {
    this.upgrade();
  }

  private firstLetterToUppercase (letter: string) {
    return letter.replace(/^[a-zA-Z]/, (letter) => letter.toUpperCase());
  }

  private bodyLetterToUpper () {
    const body: CoreDataV1['body'] = {};
    Object.entries(this.origin.body).forEach(([key, value]) => {
      body[this.firstLetterToUppercase(key)] = value;
    });
    return body;
  }

  private tabbarTypeName () {
    const list: CoreDataV1['tabbars']['list'] = [];
    this.origin.tabbars.list.forEach(item => {
      list.push({ ...item, type: this.firstLetterToUppercase(item.type) });
    });
    return list;
  }
}

export class VersionMachine implements Context {
  public data: Record<PropertyKey, unknown>;
  private current;
  constructor (data: Record<PropertyKey, unknown>) {
    this.data = JSON.parse(JSON.stringify(data));
    this.current = new StateV1(this);
  }

  setVersion (state: any) {
    this.current = state;
  }

  getVersion () {
    return this.data.version;
  }

  upgrade () {
    this.current.updateVersion();
    return this.current.origin;
  }
}

function shouldUpdate (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const fn = descriptor.value;
  descriptor.value = function (this: State, ...args: any) {
    const current = extractVersion(this.origin.version);
    const target = extractVersion(this.VERSION);
    if (isSmaller(current, target)) {
      return fn.apply(this, args);
    } else {
      return () => ({});
    }
  };
}

function isSmaller (a: number[], b: number[]) {
  return a.reduce((flag, curr, index) => {
    flag = curr < b[index];
    return flag;
  }, false);
}

function extractVersion (version?: string) {
  if (!version) {
    return [0];
  }
  if (typeof version === 'number') {
    throw new Error(`[@sepveneto/mpd-core] version ${version} must be string.`);
  }
  const [, major, patch] = version.match(/^([0-9]+)\.([0-9]+)$/) ?? [];
  if (!major || !patch) {
    throw new Error(`[@sepveneto/mpd-core] version ${version} is invalid.`);
  }
  return [Number(major), Number(patch)];
}
