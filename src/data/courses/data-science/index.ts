import statistics from './statistics.json';
import dataCleaning from './data-cleaning.json';
import exploratoryDataAnalysis from './exploratory-data-analysis.json';
import featureEngineering from './feature-engineering.json';
import dataVisualization from './data-visualization.json';
import sqlForDataScience from './sql-for-data-science.json';
import pythonForDataScience from './python-for-data-science.json';
import bigData from './big-data.json';
import abTesting from './ab-testing.json';
import dataPipelines from './data-pipelines.json';

export const dataScience = {
  id: 'data-science',
  title: 'Data Science',
  topics: [statistics, dataCleaning, exploratoryDataAnalysis, featureEngineering, dataVisualization, sqlForDataScience, pythonForDataScience, bigData, abTesting, dataPipelines]
};