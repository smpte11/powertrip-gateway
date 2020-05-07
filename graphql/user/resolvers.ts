import { Arg, Mutation, Resolver } from "type-graphql";
import User from "./schemas";
import { Configurable } from "../config";
import { Inject } from "typedi";
import CredentialInput from "./inputs";

@Resolver()
class UserResolver {
  @Inject("config")
  private config: Configurable;

  @Mutation(() => User)
  async signup(
    @Arg("newUser") { email, password, displayName }: CredentialInput
  ): Promise<User> {
    const newUser = await this.config.authService.createUser({
      email,
      password,
      displayName,
      emailVerified: true,
    });

    return {
      id: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName,
      isLogged: true,
    };
  }
}

export default UserResolver;
