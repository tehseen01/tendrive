"use client";
import React from "react";
import Script from "next/script";

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-P5N18G97Q1`}
      />
      <Script strategy="afterInteractive" id="google-analytics">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      
      gtag('config', 'G-P5N18G97Q1');
      `}</Script>
    </>
  );
};

export default GoogleAnalytics;
