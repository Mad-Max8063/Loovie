import React, { useState } from 'react';
import { AlertTriangle, X, Send } from 'lucide-react';

interface ReportUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onSubmit: (reason: string, details: string) => void;
}

const REPORT_REASONS = [
  { id: 'spam', label: 'Spam o publicidad' },
  { id: 'harassment', label: 'Acoso o comportamiento abusivo' },
  { id: 'fake', label: 'Foto falsa o perfil engañoso' },
  { id: 'inappropriate', label: 'Contenido inapropiado' },
  { id: 'other', label: 'Otro motivo' }
];

const ReportUserModal: React.FC<ReportUserModalProps> = ({ isOpen, onClose, userName, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedReason) {
      onSubmit(selectedReason, details);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setSelectedReason('');
        setDetails('');
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-2xl w-full max-w-sm overflow-hidden border border-white/10">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle size={20} />
            <span className="font-black text-xs uppercase tracking-widest">Reportar Usuario</span>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        {!submitted ? (
          <div className="p-4 space-y-4">
            <p className="text-xs text-neutral-400">Reportando a <span className="text-white font-bold">{userName}</span></p>
            
            <div className="space-y-2">
              {REPORT_REASONS.map(reason => (
                <button
                  key={reason.id}
                  onClick={() => setSelectedReason(reason.id)}
                  className={`w-full p-3 rounded-xl text-left text-xs font-bold transition-all ${
                    selectedReason === reason.id 
                      ? 'bg-red-600/20 border border-red-500 text-white' 
                      : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10'
                  }`}
                >
                  {reason.label}
                </button>
              ))}
            </div>
            
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Detalles adicionales (opcional)..."
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white resize-none h-20 focus:outline-none focus:border-red-500/50"
            />
            
            <button
              onClick={handleSubmit}
              disabled={!selectedReason}
              className="w-full py-4 bg-red-600 text-white rounded-xl font-black text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send size={14} />
              Enviar Reporte
            </button>
          </div>
        ) : (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={32} className="text-green-500" />
            </div>
            <p className="text-white font-black text-sm">Reporte Enviado</p>
            <p className="text-neutral-500 text-xs">Revisaremos tu reporte pronto.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportUserModal;
