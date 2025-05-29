export const loadStyles = async (styles: string[]): Promise<void> => {
  const stylePromises = styles.map((style) => {
    return new Promise<void>((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = style;
      
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load style: ${style}`));
      
      document.head.appendChild(link);
    });
  });

  await Promise.all(stylePromises);
}; 