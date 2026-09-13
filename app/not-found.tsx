import {sitePath} from '@/lib/site-path';
export default function NotFound(){return <main id="main" className="reading-page"><header className="reading-header"><p className="eyebrow">PAGE NOT FOUND</p><h1>Back to the<br/><em>main argument.</em></h1><p className="lead">That case isn’t in this gallery.</p><a className="text-link" href={sitePath('/')}>Browse all twelve cases →</a></header></main>}
