interface Props {
  components: Array<
    | [React.JSXElementConstructor<React.PropsWithChildren<any>>, any]
    | [React.JSXElementConstructor<React.PropsWithChildren<any>>]
  >;
  children: React.ReactNode;
}

export function MasterContext(props: Props) {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight((acc, component) => {
        const Comp = component[0];
        return <Comp {...(component?.[1] ?? {})}>{acc}</Comp>;
      }, children)}
    </>
  );
}
