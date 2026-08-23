'use client';

import { useEffect, useState } from 'react';
import styles from './acs-loader.module.css';

export default function AcsLoader() {
  const [phase, setPhase] = useState('enter');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const fadeTimer = window.setTimeout(() => setPhase('leave'), 1850);
    const removeTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = previousOverflow;
    }, 2550);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`${styles.loader} ${phase === 'leave' ? styles.leaving : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Carregando ACS"
    >
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.auroraOne} aria-hidden="true" />
      <div className={styles.auroraTwo} aria-hidden="true" />
      <div className={styles.scan} aria-hidden="true" />

      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className={styles.cornerTopLeft} aria-hidden="true" />
      <div className={styles.cornerTopRight} aria-hidden="true" />
      <div className={styles.cornerBottomLeft} aria-hidden="true" />
      <div className={styles.cornerBottomRight} aria-hidden="true" />

      <main className={styles.content}>
        <div className={styles.logoStage} aria-hidden="true">
          <div className={styles.orbitOuter} />
          <div className={styles.orbitMiddle} />
          <div className={styles.orbitInner} />
          <div className={styles.logoHalo} />
          <img className={styles.logo} src="/logo-acastilho.svg" alt="" />
          <span className={styles.satelliteOne} />
          <span className={styles.satelliteTwo} />
          <span className={styles.satelliteThree} />
        </div>

        <div className={styles.brandBlock}>
          <div className={styles.brand}>ACS</div>
          <div className={styles.tagline}>Software · Produto · IA</div>
        </div>

        <div className={styles.progressWrap} aria-hidden="true">
          <div className={styles.progressTrack}>
            <span className={styles.progressFill} />
            <span className={styles.progressSpark} />
          </div>
        </div>

        <div className={styles.status} aria-hidden="true">
          <span>Inicializando experiência</span>
          <span>Conectando serviços</span>
          <span>Preparando ACS</span>
        </div>
      </main>

      <div className={styles.footer} aria-hidden="true">
        <span className={styles.footerDot} />
        <span>Construindo tecnologia para problemas reais</span>
      </div>
    </div>
  );
}
