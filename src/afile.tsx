import React from 'react';
import { Text } from 'react-native';

type CompProps = { text: string };
const Comp: React.FC<CompProps> = ({ children, text }) => (
  <Text>{children + text}</Text>
);

export default Comp;
