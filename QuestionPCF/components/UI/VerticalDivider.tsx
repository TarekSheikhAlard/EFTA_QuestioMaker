import { makeStyles } from '@fluentui/react';
import React from 'react';

const useStyles = makeStyles({
  divider: {
    borderLeft: '1px solid #ccc',
  }
})

interface props {
  height?: string
}

const VerticalDivider = ({ height = "100%" }: props) => {
  const styles = useStyles();

  return (
    <div className={styles.divider} style={{ height }} />
  );
};

export default VerticalDivider;
