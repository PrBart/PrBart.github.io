import { useNavigate } from 'react-router-dom';
import './LanguageSwitcher.css';

const languages = [
  { id: 'en', name: 'English' },
  { id: 'ru', name: 'русский' },
];

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const navigate = useNavigate();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "en") {
      navigate("/");
    } else {
      navigate(`/${e.target.value}`);
    }
  };

  return (
    <div className="dropdown-container">
      <select
        className="fancy-dropdown"
        value={currentLang}
        onChange={handleLanguageChange}
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}