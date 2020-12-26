import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return <h1>{t('TEST')}</h1>;
}

// i18n translations might still be loaded by the http backend
// use react's Suspense
export default function I18nTest() {
  return (
    <Suspense fallback="loading">
      <MyComponent />
    </Suspense>
  );
}
