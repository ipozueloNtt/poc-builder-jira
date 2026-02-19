import { useEffect, useState } from 'react';

export type Variant = 'A' | 'B';

interface ABTestConfig {
  testName: string;
  // Porcentaje de usuarios que verán la variante B (0-100)
  variantBPercentage?: number;
}

interface ABTestResult {
  variant: Variant;
  trackEvent: (eventName: string, data?: Record<string, any>) => void;
}

/**
 * Hook para implementar A/B testing
 * @param testName - Nombre único del test
 * @param variantBPercentage - Porcentaje de usuarios en variante B (por defecto 50%)
 */
export function useABTest({ 
  testName, 
  variantBPercentage = 50 
}: ABTestConfig): ABTestResult {
  const [variant, setVariant] = useState<Variant>('A');

  useEffect(() => {
    // Clave para localStorage
    const storageKey = `ab_test_${testName}`;
    
    // Verificar si ya hay una variante asignada
    const savedVariant = localStorage.getItem(storageKey) as Variant | null;
    
    if (savedVariant && (savedVariant === 'A' || savedVariant === 'B')) {
      setVariant(savedVariant);
    } else {
      // Asignar variante aleatoriamente basado en el porcentaje
      const random = Math.random() * 100;
      const newVariant: Variant = random < variantBPercentage ? 'B' : 'A';
      
      setVariant(newVariant);
      localStorage.setItem(storageKey, newVariant);
      
      // Registrar que el usuario fue asignado a una variante
      console.log(`[A/B Test: ${testName}] Usuario asignado a variante ${newVariant}`);
    }
  }, [testName, variantBPercentage]);

  // Función para rastrear eventos
  const trackEvent = (eventName: string, data?: Record<string, any>) => {
    const event = {
      test: testName,
      variant,
      event: eventName,
      timestamp: new Date().toISOString(),
      ...data,
    };
    
    console.log('[A/B Test Event]', event);
    
    // Aquí podrías enviar a Google Analytics, Mixpanel, etc.
    // Ejemplo: window.gtag?.('event', eventName, event);
  };

  return { variant, trackEvent };
}
