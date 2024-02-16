import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { useForm, Controller } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { z } from "zod";

import Button from "@/components/buttons/Button";
import TextField from "@/components/inputs/TextField";
import Heading from "@/components/typography/Heading";
import Paragraph from "@/components/typography/Paragraph";
import { dark, spacing } from "@/constants/DesignTokens";
import { useSession } from "@/context/auth";

const EMAIL = "email";

const emailInputSchema = z.object({
  [EMAIL]: z.string().email()
});

type EmailInputSchema = z.infer<typeof emailInputSchema>;

export default function SignIn() {
  const { signIn } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<EmailInputSchema>({
    resolver: zodResolver(emailInputSchema)
  });

  const onSubmit = (data: EmailInputSchema) => {
    signIn(data[EMAIL]);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/image-login-screen.png")}
        contentFit="cover"
      />

      <View style={styles.loginContainer}>
        <Heading>Torne-se Chainless</Heading>

        <View style={{ gap: spacing[16], width: "100%" }}>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                placeholder="Email"
                value={value}
                error={errors[EMAIL]?.message}
                onChange={onChange}
                onBlur={onBlur}
                inputMode="email"
              />
            )}
            name={EMAIL}
          />

          <Button text="Enviar código" onPress={handleSubmit(onSubmit)} />
        </View>

        <View style={styles.textContainer}>
          <Paragraph size="xs">
            Ao criar uma conta você concorda com os nossos
          </Paragraph>

          <View style={styles.linksWrapper}>
            <Paragraph size="xs" style={{ color: dark.fg.link }}>
              Termos de Uso
            </Paragraph>

            <Paragraph size="xs">e</Paragraph>

            <Paragraph size="xs" style={{ color: dark.fg.link }}>
              Política de Privacidade
            </Paragraph>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: dark.bg.canvas
  },
  image: {
    flex: 1,
    width: "100%"
  },
  loginContainer: {
    paddingHorizontal: spacing[16],
    paddingTop: spacing[32],
    paddingBottom: spacing[16],
    alignItems: "center",
    gap: spacing[24],
    height: 270
  },
  textContainer: {
    marginTop: "auto",
    alignItems: "center"
  },
  linksWrapper: {
    flexDirection: "row",
    gap: spacing[4]
  }
});
