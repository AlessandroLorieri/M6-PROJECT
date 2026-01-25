const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const AuthorSchema = require("../author/author.schema")

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value?.toLowerCase()
                const googleId = profile.id
                const name = profile.name?.givenName || "Google"
                const surname = profile.name?.familyName || "User"
                const avatar = profile.photos?.[0]?.value

                if (!email) {
                    return done(new Error("Google account has no email"), null)
                }

                let user = await AuthorSchema.findOne({ googleId })

                if (!user) {
                    user = await AuthorSchema.findOne({ email })
                    if (user) {
                        user.googleId = googleId
                        if (avatar && !user.avatar) user.avatar = avatar
                        await user.save()
                    }
                }

                if (!user) {
                    user = await AuthorSchema.create({
                        name,
                        surname,
                        email,
                        avatar,
                        googleId,
                        provider: "google"
                    })
                }

                return done(null, user)
            } catch (err) {
                return done(err, null)
            }
        }
    )
)

module.exports = passport
