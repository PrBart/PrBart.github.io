import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import en from "./../markdown-raw/CV_Samovilov_Dmitriy_FE.md?raw";
import ru from "./../markdown-raw/CV_Samovilov_Dmitriy_FE_RU.md?raw";
import { Navigate, useParams } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

const markdowns: Record<string, string> = {
  en: en,
  ru: ru,
};

type Props = {
  isDefaultLang?: boolean;
};

export default function MarkdownPage({ isDefaultLang }: Props) {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = isDefaultLang ? "en" : lang;
  const markdown = markdowns[currentLang ?? ""] || markdowns["en"];

  if (lang && !Object.keys(markdowns).includes(lang)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="markdown-body" style={{ padding: "2rem" }}>
      {/* Language selector */}
      <div className="lang-switch-conteiner">
        <LanguageSwitcher currentLang={lang || "en"} />
      </div>

      {/* Markdown content */}
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
