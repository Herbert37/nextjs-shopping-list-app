import React, { lazy } from 'react';
const Menu = lazy(() => import('src/components/Menu/Menu'));
const Header = lazy(() => import('src/components/Header/Header'));

export default function Home() {
  return (
    <>
      <Menu />
      <Header
        backgroundImage={
          'https://d296xu67oj0g2g.cloudfront.net/lm_cms/images/CMS/DEALS/0923BOSI/RLB_BOSIMILLASADICIONALES.png'
        }
        title={'Shopping List'}
        subtitle={''}
        description={''}
      />
    </>
  );
}
