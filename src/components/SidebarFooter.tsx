const GITHUB_URL = 'https://github.com/endeavrhasan/gridfinity-laser-cut'
const GRIDFINITY_DOCS_URL = 'https://gridfinity.xyz/'

export function SidebarFooter() {
  return (
    <footer className="sidebar-footer">
      <div className="footer-links">
        <a className="accent" href="#about">
          About
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">
          Github
        </a>
        <a href={GRIDFINITY_DOCS_URL} target="_blank" rel="noreferrer">
          Gridfinity Docs
        </a>
      </div>
      <p className="version">Version 1.0.0</p>
    </footer>
  )
}
