import { FlashList } from "@shopify/flash-list";
import Fuse, { FuseResult } from "fuse.js";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import Container from "@/components/Container";
import SearchInput from "@/components/inputs/SearchInput";
import TokenData from "@/components/listItems/TokenData";
import { accent, spacing } from "@/constants/DesignTokens";
import useGetTokens, { GetTokens } from "@/hooks/useGetTokens";

type Event = { id: string; symbol: string };

type SelectCryptocurrencyProps = {
  OnSelectCryptocurrency: (event: Event) => void;
};

export default function SelectCryptocurrency({
  OnSelectCryptocurrency
}: SelectCryptocurrencyProps) {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetTokens();

  const fuse = new Fuse(data ?? [], {
    keys: ["symbol", "name"]
  });

  return (
    <Container style={styles.container}>
      {isLoading || !data ? (
        <ActivityIndicator
          size="large"
          color={accent.moderate}
          style={{ flex: 1 }}
        />
      ) : (
        <>
          <SearchInput value={search} onChangeText={setSearch} />

          <FlashList
            data={
              search.length > 0
                ? fuse.search(search)
                : (data as unknown as FuseResult<GetTokens>[])
            }
            fadingEdgeLength={50}
            renderItem={({ item }) => {
              const token = item?.item ?? item;
              return (
                <TokenData
                  name={token.name}
                  symbol={token.symbol}
                  image={token.image}
                  price={token.current_price}
                  change={token.price_change_percentage_24h}
                  onPress={() =>
                    OnSelectCryptocurrency({
                      id: token.id,
                      symbol: token.symbol
                    })
                  }
                />
              );
            }}
            estimatedItemSize={39}
            ItemSeparatorComponent={() => <View style={styles.space} />}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: spacing[16]
  },
  space: {
    height: spacing[16]
  }
});
