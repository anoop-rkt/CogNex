import { TypeAnimation } from "react-type-animation"

const TypingAnimation = () => {
    return (
        <TypeAnimation
            sequence={[
                'Chat with your own AI',
                1000,
                'Built with OpenAI 🤖',
                1500,
                'Your own Customized ChatGPT using GPT-3.5 Turbo',
                2000,
            ]}
            wrapper="span"
            speed={50}
            style={{
                fontSize: '2em',
                color: "white",
                textShadow: "1px 1px 20px #000",
                display: 'inline-block'
            }}
            repeat={Infinity}
        />
    )
}

export default TypingAnimation
