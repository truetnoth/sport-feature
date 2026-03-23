import styles from './SearchBar.module.css';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className={styles.root}>
      <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#7B7B7B" strokeWidth="2"/>
        <path d="M16.5 16.5L21 21" stroke="#7B7B7B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <input
        className={styles.input}
        type="text"
        placeholder="Поиск упражнений..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')} aria-label="Очистить">
          ×
        </button>
      )}
    </div>
  );
}
