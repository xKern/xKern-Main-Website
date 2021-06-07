import styles from './ContactInfo.module.scss';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Contact {
  icon: IconDefinition;
  title: string;
  lines: string[];
}

const ContactInfo = () => {
  const info: Contact[] = [
    {
      icon: faMobileAlt,
      title: 'Phone',
      lines: [
        '+91 9288 01 8558',
        '+91 9288 01 8556'
      ]
    },
    {
      icon: faMapMarkerAlt,
      title: 'Address',
      lines: [
        'Second Floor',
        'Alathara Towers',
        'Kazhakuttom Junction',
        'NH Road, Kazhakuttom',
        'Trivandrum',
        '695582'
      ]
    },
    {
      icon: faEnvelope,
      title: 'Email',
      lines: [
        'info@xkern.net',
        'hrm@xkern.net'
      ]
    }
  ];

  return (
    <>
      <svg width="0" height="0">
        <radialGradient id="graygradient">
          <stop offset="0%" stopColor="#5f5f5f" />
          <stop offset="100%" stopColor="#aaa" />
        </radialGradient>
      </svg>

      <section className={styles.wrapper}>
        {info.map((block, idx) => (
          <div className={styles.block} key={idx}>
            <div className={styles.header}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={block.icon} />
              </div>
              <h2>{block.title}</h2>
            </div>

            <div className={styles.contents}>
              {block.lines.map((line, idx) => <div key={idx}>{line}</div>)}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default ContactInfo;
