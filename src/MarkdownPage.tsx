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

type Props = {
  isDefaultLang?: boolean;
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
    <div className="markdown-body" style={{ padding: "2rem" }}>
      {/* Language selector + Print button */}
      <div className="top-buttons-conteiner no-print">
        <div style={{ width: 140, height: 140 }}>
          <LanguageSwitcher currentLang={currentLang} />
          <div style={{ display: "flex", marginTop: 10 }}>
            <button
              className="print-button no-print"
              style={{ padding: "10px 5px" }}
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
  );
}
