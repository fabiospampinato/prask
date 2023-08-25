
/* IMPORT */

import Spinner from 'tiny-spinner';

/* TYPES */

type Actions = {
  update: ( message: string ) => void,
  resolve: ( message: string ) => void,
  reject: ( message: string ) => void
};

/* MAIN */

const spinner = ( fn: ( actions: Actions ) => void ): Promise<boolean> => {

  return new Promise ( async resolve => {

    const spinner = new Spinner ();

    await fn ({
      update: message => {
        spinner.start ( message );
        spinner.update ( message );
      },
      resolve: message => {
        spinner.start ( message );
        spinner.success ( message );
        resolve ( true );
      },
      reject: message => {
        spinner.start ( message );
        spinner.error ( message );
        resolve ( false );
      }
    });

  });

};

/* EXPORT */

export default spinner;
