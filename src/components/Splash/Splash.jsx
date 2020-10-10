// Import External Dependencies
import React, { useState, useEffect } from 'react';

// Import Components
import Container from '../Container/Container';
import SplashViz from '../SplashViz/SplashViz';
import Markdown from '../Markdown/Markdown';
import {PlaceholderComponent} from '../Placeholder/Placeholder';

// Import helpers
import isClient from '../../utilities/is-client';

// Import Demo Content
import SplashContent from '../../content/index.md';

// Load Styling
import './Splash.scss';

const Support = React.lazy(() => import('../Support/Support'));

const SponsorsPlaceholder = () => (
  <>
    <h2>Latest Sponsors</h2>
    <PlaceholderComponent />

    <h2>Platinum Sponsors</h2>
    <PlaceholderComponent />

    <h2>Gold Sponsors</h2>
    <PlaceholderComponent />

    <h2>Silver Sponsors</h2>
    <PlaceholderComponent />

    <h2>Bronze Sponsors</h2>
    <PlaceholderComponent />

    <h2>Backers</h2>
    <PlaceholderComponent />
  </>
);

const Splash = () => {
  const [showSponsors, setShowSponsors] = useState(false);
  const [supportType, setSupportType] = useState(() => Math.random() < 0.33 ? 'monthly' : 'total');
  useEffect(() => {
    if(isClient) setShowSponsors(true);
  }, []);
  return (
    <div className="splash">
      <SplashViz />

      <div className="splash__section splash__section--dark page__content">
        <Container>
          <Markdown>
            <div dangerouslySetInnerHTML={{
              __html: SplashContent
            }} />
          </Markdown>
        </Container>
      </div>

      <div className="splash__section page__content">
        <Container>
          <Markdown>
            <h1 id="sponsors">Support the Team</h1>

            <p>
              Through contributions, donations, and sponsorship, you allow webpack to thrive. Your
              donations directly support office hours, continued enhancements, and most importantly,
              great documentation and learning material!
            </p>

            { showSponsors ? (
              <React.Suspense fallback={<SponsorsPlaceholder />}>
                <p><input type="checkbox" checked={supportType === 'monthly'} onChange={e => setSupportType(e.target.checked ? 'monthly' : 'total')} /> Show sponsors by their average monthly amount of sponsoring in the last year.</p>

                <Support type={supportType} rank="latest" />

                <Support type={supportType} rank="platinum" />

                <Support type={supportType} rank="gold" />

                <Support type={supportType} rank="silver" />

                <Support type={supportType} rank="bronze" />

                <Support type={supportType} rank="backer" />
              </React.Suspense>
            ) : (
              <SponsorsPlaceholder />
            ) }
          </Markdown>
        </Container>
      </div>
    </div>
  );
};

export default Splash;
