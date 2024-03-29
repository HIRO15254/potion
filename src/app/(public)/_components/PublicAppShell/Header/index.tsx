import {AppShell, Code, Group, Title, Anchor} from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import {PUBLIC_TOP_URL} from 'config/urlConfig';

import classes from './index.module.css';
import packageJson from '../../../../../../package.json';

/**
 * 共有ページで表示されるヘッダー
 */
export const Header: React.FC = () => {
  return (
    <AppShell.Header p="xs">
      <Group justify="space-between" h="100%">
        <Group>
          <Anchor component={Link} href={PUBLIC_TOP_URL} underline="never">
            <Title order={3} className={classes.title}>
              {packageJson.name}
            </Title>
          </Anchor>
          <Code>{`v${packageJson.version}`}</Code>
        </Group>
      </Group>
    </AppShell.Header>
  );
};
