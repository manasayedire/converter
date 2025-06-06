import {
  Flex,
  ActionButton,
  MenuTrigger,
  Menu,
  Item,
} from '@adobe/react-spectrum';
import GlobeGrid from '@spectrum-icons/workflow/GlobeGrid';
import { useTranslations } from '../hooks/useTranslations';

export interface HeaderProps {
  setLocale: (locale: string) => void;
}

function Header(props: HeaderProps) {
  const { formatMessage } = useTranslations();
  
  return (
    <Flex direction="row" justifyContent="end">
      <MenuTrigger>
        <ActionButton data-testid="header-change-language-button" aria-label={formatMessage.format('globe.menu.label')} isQuiet>
          <GlobeGrid />
        </ActionButton>
        <Menu onAction={(key) => props.setLocale(key as string)}>
          <Item key="en-US">English</Item>
          <Item key="es-ES">Spanish</Item>
        </Menu>
      </MenuTrigger>
    </Flex>
  );
}

export default Header;
