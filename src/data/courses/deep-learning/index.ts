import neuralNetworks from './neural-networks.json';
import convolutionalNeuralNetworks from './convolutional-neural-networks.json';
import recurrentNeuralNetworks from './recurrent-neural-networks.json';
import transformers from './transformers.json';
import optimizationTechniques from './optimization-techniques.json';
import regularization from './regularization.json';
import autoencoders from './autoencoders.json';
import gans from './gans.json';
import computerVision from './computer-vision.json';
import deployment from './deployment.json';

export const deepLearning = {
  id: 'deep-learning',
  title: 'Deep Learning',
  topics: [neuralNetworks, convolutionalNeuralNetworks, recurrentNeuralNetworks, transformers, optimizationTechniques, regularization, autoencoders, gans, computerVision, deployment]
};