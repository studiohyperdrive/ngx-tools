/**
 * A base type for the session of the authenticated user, providing features and permissions
 *
 * @template FeatureType - A list of possible features
 * @template PermissionType - A list of possible permissions
 */
export interface AuthenticatedUserSession<
	FeatureType extends string = string,
	PermissionType extends string = string,
> {
	/**
	 * An optional list of feature flags assigned to the user
	 */
	features?: FeatureType[];

	/**
	 * An optional list of permissions assigned to the user
	 */
	permissions?: PermissionType[];
}

/**
 * A base type for an authentication request, providing the authenticated user and optional session and metadata.
 *
 * @template UserType - The type of the authenticated user
 * @template MetadataType - An optional type of the metadata
 */
export interface AuthenticationResponse<UserType, MetadataType = any> {
	/**
	 * The authenticated user
	 */
	user: UserType;
	/**
	 * An optional set of session related data
	 */
	session?: AuthenticatedUserSession;
	/**
	 * The optional set of metadata
	 */
	metadata?: MetadataType;
}
