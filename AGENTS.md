<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep portfolio facts in `src/data/portfolio.ts`, sourced only from Ahmed's CV and explicit brief, so presentation changes cannot silently invent credentials or results.
- Use a single scrolling home page with anchored sections and separate case-study routes because the brief explicitly requests one page while projects need shareable details.
- Contact form composes an email in the visitor's mail app rather than claiming delivery, because no mail service is configured.
