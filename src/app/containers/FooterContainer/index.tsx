import React from 'react';
import { observer } from 'mobx-react';
import { Footer } from 'app/components';
import style from './style.css';

export const FooterContainer = observer(() => {
  return (
    <div className={style.FooterContainer}>
      <Footer />
    </div>
  );
});
