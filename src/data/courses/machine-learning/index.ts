import supervisedLearning from './supervised-learning.json';
import modelEvaluation from './model-evaluation.json';
import unsupervisedLearning from './unsupervised-learning.json';
import featureEngineering from './feature-engineering.json';
import ensembleLearning from './ensemble-learning.json';
import optimization from './optimization.json';
import timeSeries from './time-series.json';
import nlpBasics from './nlp-basics.json';
import mlPipelines from './ml-pipelines.json';
import modelDeployment from './model-deployment.json';

export const machineLearning = {
  id: 'machine-learning',
  title: 'Machine Learning',
  topics: [supervisedLearning, modelEvaluation, unsupervisedLearning, featureEngineering, ensembleLearning, optimization, timeSeries, nlpBasics, mlPipelines, modelDeployment]
};