import { ROUTES } from '@constants';
import Link from 'next/link';
import { BannerWrap, WelcomePageWrapper } from './Welcome.style';
import { IconAppStore, IconGoogleApp } from '@ui/Svgs';

const Welcome = () => {
  return (
    <WelcomePageWrapper>
      <div className="welcome-content">
        <BannerWrap>
          <div className="banner-content-wrap">
            <div className="app-platform">
              {/* <div className="download-app">
                <IconGoogleApp />
                <IconAppStore />
              </div> */}
              <div className="welcome-join-now">
                <Link href={ROUTES.SIGNIN}>
                  <div className="btn-join-now">Join now</div>
                </Link>
              </div>
            </div>
          </div>
        </BannerWrap>
      </div>
    </WelcomePageWrapper>
  );
};

export default Welcome;
