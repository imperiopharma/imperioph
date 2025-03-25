
import React, { useState, useEffect } from 'react';
import { Truck, TruckIcon, Package, AlertTriangle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ShippingMethodFormProps {
  setShippingMethod: (method: string | null) => void;
  formErrors: Record<string, string>;
}

export const ShippingMethodForm: React.FC<ShippingMethodFormProps> = ({
  setShippingMethod,
  formErrors,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [calculatingShipping, setCalculatingShipping] = useState(false);
  
  // Cálculo simulado de frete com base no método selecionado
  useEffect(() => {
    if (!selectedMethod) {
      setShippingCost(0);
      return;
    }
    
    setCalculatingShipping(true);
    
    // Simulação de cálculo de frete
    setTimeout(() => {
      const state = localStorage.getItem('shipmentState') || 'SP';
      
      if (state === 'SP' || state === 'RJ') {
        if (selectedMethod === 'sedex') setShippingCost(20);
        else if (selectedMethod === 'pac') setShippingCost(15);
        else if (selectedMethod === 'transportadora') setShippingCost(40);
      } else {
        if (selectedMethod === 'sedex') setShippingCost(30);
        else if (selectedMethod === 'pac') setShippingCost(20);
        else if (selectedMethod === 'transportadora') setShippingCost(40);
      }
      
      setCalculatingShipping(false);
    }, 500);
  }, [selectedMethod]);
  
  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
    setShippingMethod(value);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-subtle p-6 mb-8">
      <h2 className="text-xl font-medium mb-6">Método de Envio</h2>
      
      <RadioGroup 
        value={selectedMethod || ""}
        onValueChange={handleMethodChange}
        className="space-y-4"
      >
        <div className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-imperio-navy/30 ${selectedMethod === 'sedex' ? 'border-imperio-navy bg-imperio-extra-light-navy' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="sedex" id="sedex" />
            <Label htmlFor="sedex" className="flex items-center cursor-pointer">
              <TruckIcon size={20} className="mr-2 text-imperio-navy" />
              <span className="font-medium">Sedex</span>
            </Label>
          </div>
        </div>
        
        <div className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-imperio-navy/30 ${selectedMethod === 'pac' ? 'border-imperio-navy bg-imperio-extra-light-navy' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="pac" id="pac" />
            <Label htmlFor="pac" className="flex items-center cursor-pointer">
              <Package size={20} className="mr-2 text-imperio-navy" />
              <span className="font-medium">PAC</span>
            </Label>
          </div>
        </div>
        
        <div className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-imperio-navy/30 ${selectedMethod === 'transportadora' ? 'border-imperio-navy bg-imperio-extra-light-navy' : 'border-gray-200'}`}>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="transportadora" id="transportadora" />
            <Label htmlFor="transportadora" className="flex items-center cursor-pointer">
              <Truck size={20} className="mr-2 text-imperio-navy" />
              <span className="font-medium">Transportadora</span>
            </Label>
          </div>
        </div>
      </RadioGroup>
      
      {formErrors.shippingMethod && (
        <p className="text-imperio-red text-sm mt-3">{formErrors.shippingMethod}</p>
      )}
      
      {/* Mostrar o valor do frete calculado */}
      {selectedMethod && (
        <div className="mt-4 p-4 bg-imperio-extra-light-navy rounded-lg">
          <h3 className="font-medium mb-2">Valor do Frete</h3>
          {calculatingShipping ? (
            <div className="flex items-center">
              <div className="w-5 h-5 border-t-2 border-b-2 border-imperio-navy rounded-full animate-spin mr-2"></div>
              <span>Calculando...</span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span>Total do frete:</span>
              <span className="font-semibold text-imperio-navy">
                {shippingCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Aviso sobre prazo de entrega */}
      <Alert className="mt-4 bg-yellow-50 border-yellow-200">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-sm text-yellow-800">
          Os prazos de entrega são estimados e podem variar de acordo com a região.
        </AlertDescription>
      </Alert>
    </div>
  );
};
