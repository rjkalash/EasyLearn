import limits from './limits.json';
import derivatives from './derivatives.json';
import applicationsOfDerivatives from './applications-of-derivatives.json';
import integrals from './integrals.json';
import applicationsOfIntegrals from './applications-of-integrals.json';
import multivariableCalculus from './multivariable-calculus.json';
import series from './series.json';
import differentialEquations from './differential-equations.json';
import vectorCalculus from './vector-calculus.json';
import optimization from './optimization.json';

export const calculus = {
  id: 'calculus',
  title: 'Calculus',
  topics: [limits, derivatives, applicationsOfDerivatives, integrals, applicationsOfIntegrals, multivariableCalculus, series, differentialEquations, vectorCalculus, optimization]
};