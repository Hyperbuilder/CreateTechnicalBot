
module.exports = {
    unknownCommand: "I could not run that command.",
    notInGuild: "This command can only be used in a guild.",
    notAuth: "This command can only be used by an admin.",
    error: "I could not run that command, please contact your server administrator.",
    adminRole: "op",
    unknownRole: "This server is missing the admin role, please contact your server administrator.",
    notSettingUpEnd: "You have not setup the form.",
    setSubmissionsReply: "Form submissions will now be sent to you.",
    setSubmissionsChannelReply: "Form submissions will now be posted in this channel.",
    submissionsNotSet: "Submissions have not been set, please contact your server administrator",
    applicationCancel: "Application canceled.",
    applicationFormFalseCancel: "You have not started an application form yet.",
    applicationSent: "Congratulations, Your Application form has been submitted and will be reviewed within 24h.",
    formSetupInProgress: "Someone else is already configuring the form.",
    newFormSetup: "The new form has been setup.",
    defaultRejectMessage: "I'm sorry to inform you your application to Create Technical has been denied, if you require further information feel free to message a member of the Dev team. You may reapply at a later date, however please do not send multiple applications at the same time",
    formReceiveMessage: params => `${params.user} has submitted an Application form and should be reviewed.`,
    formApplyMessage: params => `Application commands: \`\`\`${params.botChar}cancel, ${params.botChar}redo\`\`\``,
    formSetupMessage: params => `Enter questions and enter \`${params.botChar}endsetup\` when done.`
}