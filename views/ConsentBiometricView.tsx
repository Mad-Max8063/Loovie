
import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface ConsentBiometricViewProps {
  onAccept: () => void;
  onDecline: () => void;
}

const ConsentBiometricView: React.FC<ConsentBiometricViewProps> = ({
  onAccept,
  onDecline,
}) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col p-6 animate-in fade-in duration-500 overflow-auto">
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        maxWidth: '480px', margin: '0 auto', gap: '1.5rem',
        color: '#fff', flex: 1, justifyContent: 'center'
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid rgba(34,197,94,0.3)'
        }}>
          <ShieldCheck size={40} color="#4ade80" />
        </div>

        <h1 style={{ fontSize: '1.5rem', textAlign: 'center', fontWeight: 900, letterSpacing: '-0.02em' }}>
          Verificación de Identidad
        </h1>
        <p style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.9rem', lineHeight: 1.6 }}>
          Antes de continuar, necesitamos tu permiso explícito para procesar tu imagen.
        </p>

        <div style={{
          background: 'rgba(255,255,255,0.04)', borderRadius: '16px',
          padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start',
          border: '1px solid rgba(255,255,255,0.08)', width: '100%'
        }}>
          <AlertTriangle size={24} color="#fbbf24" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <strong style={{ fontSize: '0.95rem' }}>¿Qué datos procesamos?</strong>
            <ul style={{
              marginTop: '0.5rem', paddingLeft: '1.25rem', lineHeight: 1.8,
              fontSize: '0.85rem', opacity: 0.8
            }}>
              <li>Tu foto de perfil es analizada por <strong>Google Gemini AI</strong> para verificar que es una persona real.</li>
              <li>Las imágenes se procesan en tiempo real y <strong>no se almacenan</strong> en servidores de terceros más allá del análisis puntual.</li>
              <li>No usamos tus datos biométricos para entrenar modelos de IA.</li>
            </ul>
          </div>
        </div>

        <p style={{
          fontSize: '0.78rem', opacity: 0.45, textAlign: 'center', lineHeight: 1.7,
          padding: '0 1rem'
        }}>
          Esta práctica cumple con la <strong>Ley 25.326</strong> de Protección de Datos Personales (Argentina).
          Podés revocar este consentimiento en cualquier momento desde tu perfil.
        </p>

        <div style={{
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
          width: '100%', paddingTop: '0.5rem'
        }}>
          <button
            onClick={onAccept}
            style={{
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              color: '#fff', border: 'none', padding: '16px 24px',
              borderRadius: '16px', fontSize: '0.85rem', fontWeight: 900,
              cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.15em',
              boxShadow: '0 4px 20px rgba(220, 38, 38, 0.3)'
            }}
          >
            Entiendo y acepto
          </button>
          <button
            onClick={onDecline}
            style={{
              background: 'transparent', color: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '14px 24px', borderRadius: '16px',
              fontSize: '0.8rem', cursor: 'pointer', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em'
            }}
          >
            No acepto (no podré verificarme)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBiometricView;
