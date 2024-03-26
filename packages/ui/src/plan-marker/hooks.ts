import { onMounted, onUnmounted, ref, Ref } from 'vue';

const wrapperStyle = ref({});

export const useWrapperFit = (wrapperRef: Ref, imgRef: Ref) => {
  const fit = () => {
    const ww = wrapperRef.value.clientWidth;
    const wh = wrapperRef.value.clientHeight;
    const iw = imgRef.value.clientWidth;
    const ih = imgRef.value.clientHeight;
    wrapperStyle.value = { opacity: 1, ...(ww / wh > iw / ih ? { height: '100%' } : { width: '100%' }) };
  };

  onMounted(() => window.addEventListener('resize', fit));
  onUnmounted(() => window.removeEventListener('resize', fit));

  return { fit, wrapperStyle };
};
