import LogOutIcon from "@assets/icons/log-out.svg";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import SettingsButton from "@/components/buttons/SettingsButton";
import Heading from "@/components/typography/Heading";
import Label from "@/components/typography/Label";
import Paragraph from "@/components/typography/Paragraph";
import { borderRadius, dark, spacing } from "@/constants/DesignTokens";
import { BLURHASH } from "@/constants/configurations";
import { useSession } from "@/context/auth";

export default function Settings() {
  const { userInfo, signOut } = useSession();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={userInfo?.avatar}
            placeholder={BLURHASH}
            contentFit="cover"
          />
        </View>

        <View style={{ gap: spacing[8] }}>
          <Heading size="heading2">{userInfo?.name}</Heading>

          <Label size="sm-regular">{userInfo?.email}</Label>
        </View>
      </View>

      <View style={styles.bottom}>
        <SettingsButton
          trailingIcon={<LogOutIcon />}
          onPress={() => {
            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
            signOut();
          }}
        >
          <Label size="sm-regular">Log out</Label>
        </SettingsButton>

        <Paragraph
          size="xs"
          style={{
            paddingHorizontal: spacing[16]
          }}
        >
          It is not necessary to close the session. To keep your account secure, 
          We will always ask for your confirmation when you open the app.
        </Paragraph>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing[24],
    backgroundColor: dark.bg.canvas
  },
  header: {
    gap: spacing[16],
    paddingHorizontal: spacing[16],
    paddingTop: spacing[16],
    paddingBottom: spacing[40]
  },
  imageWrapper: {
    width: 56,
    aspectRatio: 1,
    borderRadius: borderRadius.pill,
    overflow: "hidden"
  },
  image: {
    width: 56,
    aspectRatio: 1
  },
  bottom: { gap: spacing[16], marginTop: "auto" },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[8]
  }
});
