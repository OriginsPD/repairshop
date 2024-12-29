import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'
import * as Sentry from '@sentry/nextjs'
import { metadata } from '@/app/layout'

export const safeAction = createSafeActionClient({
    defineMetadataSchema() {
        return z.object({
            actionName: z.string(),
        })
    },
    handleServerError(e, utils) {
        const { clientInput, metadata } = utils
        Sentry.captureException(e, (scope) => {
            scope.clear()
            scope.setContext('serverError', { message: e.message })
            scope.setContext('metaData', { actionName: metadata?.actionName })
            scope.setContext('clientInput', { clientInput: clientInput })
            return scope
        })
        if (e.constructor.name === 'DatabaseError') {
            return "Database error: Your Data was not saved support will be notified"
        }
        return e.message
    }
})