#!/usr/bin/env python3
from __future__ import annotations
import argparse, json, re
from datetime import datetime, timezone
from pathlib import Path
SENSITIVE_LINE=re.compile(r"(?i)(password|senha|passwd|secret|segredo|api[ _-]?key|access[ _-]?token|refresh[ _-]?token|authorization|database_url|connection[ _-]?string|private[ _-]?key|client[ _-]?secret|credential|credencial|\.env)")
TOKEN=re.compile(r"(?i)\b(?:sk-[a-z0-9_-]{12,}|ghp_[a-z0-9]{12,}|github_pat_[a-z0-9_]{12,}|eyJ[a-z0-9_.-]{20,})\b")
URI_CREDENTIALS=re.compile(r"(://[^\s/:@]+:)[^@\s/]+(@)")
SAFE_TOP_LEVEL=("docs/DEVELOPMENT_GOVERNANCE.md","docs/PRODUCT_REPORTS.md")
SAFE_DIRS=(("docs/issues","Issues"),("docs/reviews","Revisões"),("docs/ideas","Ideias"))
def sanitize(text):
    out=[]
    for raw in text.splitlines():
        line=raw.rstrip()
        if SENSITIVE_LINE.search(line): out.append('[conteúdo sensível omitido]'); continue
        line=URI_CREDENTIALS.sub(r"\1[REDACTED]\2",line); line=TOKEN.sub('[REDACTED]',line)
        out.append(line[:1800]+(' …' if len(line)>1800 else ''))
    return '\n'.join(out).strip()[:18000]
def title_for(path,content):
    for line in content.splitlines():
        if line.startswith('# '): return line[2:].strip()[:160]
    return path.stem.replace('_',' ').replace('-',' ').title()
def collect(root):
    candidates=[]
    for item in SAFE_TOP_LEVEL:
        p=root/item
        if p.is_file(): candidates.append((p,'Governança'))
    for d,c in SAFE_DIRS:
        base=root/d
        if base.is_dir(): candidates.extend((p,c) for p in sorted(base.glob('*.md'),reverse=True))
    docs=[]
    for p,c in candidates[:50]:
        safe=sanitize(p.read_text(encoding='utf-8',errors='replace'))
        if safe: docs.append({'id':p.relative_to(root).as_posix().replace('/','-').replace('.md',''),'category':c,'title':title_for(p,safe),'source':p.relative_to(root).as_posix(),'content':safe})
    return docs
def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--project',required=True); ap.add_argument('--output',required=True); a=ap.parse_args(); root=Path.cwd(); out=root/a.output; out.parent.mkdir(parents=True,exist_ok=True)
    out.write_text(json.dumps({'schema_version':1,'project':a.project,'generated_at':datetime.now(timezone.utc).isoformat(),'privacy':{'mode':'public_sanitized_allowlist','notice':'Esta área pública recebe apenas uma projeção reduzida de documentos permitidos; padrões de credenciais e dados sensíveis são omitidos antes da publicação.'},'documents':collect(root)},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
if __name__=='__main__': main()
