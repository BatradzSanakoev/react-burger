import React from 'react';
import countStyles from './Count.module.css';

type TCountProps = { count: number | boolean | undefined };

const Count = ({ count }: TCountProps) => {
  return (
    <>
      {count! > 0 && (
        <div className={countStyles.element}>
          <p className='text text_type_main-small'>{count}</p>
        </div>
      )}
    </>
  );
};

export default Count;
