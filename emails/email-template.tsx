import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

interface EmailTemplateProps {
    url: string;
    // host: string;
}

export function EmailTemplate({
    url,
    // host,
}: EmailTemplateProps) {
    return (
        <Html>
            <Head />
            <Preview>Votre invitation au salon Made In Neuilly</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* <LogoComponent /> */}
                    <Heading style={heading}>Votre invitation au salon Made In Neuilly</Heading>
                    <Section style={body}>
                        <Text style={paragraph}>Hello cher artisan,</Text>
                        <Text style={paragraph}>
                            Vous avez demandé à rejoindre le salon Made In Neuilly.
                            Cliquez sur le bouton ci-dessous pour finaliser votre inscription :
                        </Text>
                        <Link style={button} href={url}>
                            Finaliser votre inscription
                        </Link>
                    </Section>
                    <Text style={paragraph}>
                        Bienvenue à Made In Neuilly,
                        <br />
                        L'équipe Made In Neuilly
                    </Text>
                    <Hr style={hr} />
                    <Text style={footer}>{baseUrl}</Text>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 25px 48px",
    maxWidth: "580px",
};

const heading = {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "32px",
};

const body = {
    margin: "24px 0",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const button = {
    backgroundColor: "#b060ff",
    borderRadius: "5px",
    color: "#fff",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: "50px",
    textAlign: "center" as const,
    textDecoration: "none",
    width: "200px",
    marginTop: "16px",
    marginBottom: "16px",
};

const hr = {
    borderColor: "#dddddd",
    marginTop: "48px",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
    marginTop: "12px",
};

export default EmailTemplate;