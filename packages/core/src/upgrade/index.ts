interface Upgrade {
  <T extends Record<PropertyKey, unknown>>(data: T): T
  VERSION: string
}
export const upgrade = <Upgrade>((data: Record<PropertyKey, unknown>) => {
  const version = data.version;
  console.log(version);
  return data;
});

upgrade.VERSION = '2.0';
