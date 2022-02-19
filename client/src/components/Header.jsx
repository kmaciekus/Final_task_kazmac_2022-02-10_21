import React from 'react';
import { Head, HeaderTitle } from "../ui/Header/Header";

export const Header = ({title}) => {
  return (
      <Head>
          <HeaderTitle>{title}</HeaderTitle>
      </Head>
  );
};
