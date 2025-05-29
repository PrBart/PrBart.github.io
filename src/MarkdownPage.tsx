import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Navigate, useParams } from "react-router-dom";

import LanguageSwitcher from "./LanguageSwitcher";
import { PrintButtonLanguage } from "./consts";
import {
  defaultLang,
  getMarkdown,
  supportedLanguages,
} from "./lib/loadMarkdownCVs";

import "./MarkdownPage.css";

type Props = {
  isDefaultLang?: boolean;
  theme?: string;
};

export default function MarkdownPage({ isDefaultLang }: Props) {
  const { lang } = useParams<{ lang: string }>();

  const currentLang = isDefaultLang ? defaultLang : lang ?? defaultLang;

  if (lang && !supportedLanguages.includes(lang)) {
    return <Navigate to="/" replace />;
  }
  const markdown = getMarkdown(currentLang);
  const printLabelText =
    PrintButtonLanguage[currentLang as keyof typeof PrintButtonLanguage] ||
    PrintButtonLanguage.en;

  return (
    <div className="page-conteiner">
      <div className="markdown-body markdown-page">
        {/* Language selector + Print button */}
        <div className="top-buttons-conteiner no-print">
          <div className="language-selector">
            {!(supportedLanguages.length < 2) && (
              <LanguageSwitcher currentLang={currentLang} />
            )}
            <div className="print-button-container">
              <button
                className="print-button no-print"
                onClick={() => window.print()}
              >
                {printLabelText}
              </button>
            </div>
          </div>
        </div>

        {/* Markdown content */}
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
