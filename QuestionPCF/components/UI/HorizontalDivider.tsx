import { makeStyles } from '@fluentui/react';
import React from 'react';

const useStyles = makeStyles({
  divider: {
    borderTop: '1px solid #ccc',
  }
})

interface props {
  width?: string
}

const HorizontalDivider = ({ width = "100%" }: props) => {
  const styles = useStyles();

  return (
    <div className={styles.divider} style={{ width }} />
  );
};

export default HorizontalDivider;
