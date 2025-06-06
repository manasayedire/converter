import {
  Flex,
  ActionButton,
  MenuTrigger,
  Menu,
  Item,
} from '@adobe/react-spectrum';
import GlobeGrid from '@spectrum-icons/workflow/GlobeGrid';

export interface HeaderProps {
  setLocale: (locale: string) => void;
}

function Header(props: HeaderProps) {
  return (
    <Flex direction="row" justifyContent="end">
      <MenuTrigger>
        <ActionButton aria-label="Icon only" isQuiet>
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
