type Props = {
    result: {
        data?: {
            message: string
        }
        serverError?: string,
        validationError?: Record<string, string[] | undefined>
    }
}

const MessageBox = ({
    type,
    content
}: { type: 'error' | 'success', content: React.ReactNode }) => {
    return (
        <div className={`bg-accent px-4 py-2 my-2 rounded-lg ${type === 'error' ? 'text-red-500' : ''}`}>
            {type === 'success' ? "🎉" : "🚨"} {content}
        </div>
    )
}

export function DisplayServerActionResponse({ result }: Props) {
    const { data, serverError, validationError } = result
    return (
        <div>
            {data?.message && (
                < MessageBox type="success" content={`Success: ${data?.message}`} />
            )}
            {serverError && (
                < MessageBox type="success" content={`Success: ${serverError}`} />
            )}
            {validationError && (
                < MessageBox type="success" content={`Success: ${Object.keys(validationError).map(key => (
                    <p key={key}>{`${key}: ${validationError[key as keyof typeof validationError]}`}</p>
                ))}`} />
            )}
        </div>
    )
}