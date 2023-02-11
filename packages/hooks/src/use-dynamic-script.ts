import { ref } from 'vue';

export function useDynamicScript (url: string) {
  const ready = ref(false);
  const errorLoading = ref(false);

  const element = document.createElement('script');
  element.src = url;
  element.type = 'text/javascript';
  element.async = true;

  element.onload = () => {
    ready.value = true;
    document.head.removeChild(element);
  };
  element.onerror = () => {
    ready.value = false;
    errorLoading.value = true;
  };

  document.head.appendChild(element);

  return { ready, errorLoading };
}
