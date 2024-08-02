type NextNavigation = {
  useSearchParams: jest.MockedFunction<() => { get: jest.MockedFunction<() => string | null> }>;
};

const NextNavigationMock = jest.createMockFromModule<NextNavigation>('next/navigation');

NextNavigationMock.useSearchParams.mockImplementation(() => ({
  get: jest.fn(),
}));

module.exports = NextNavigationMock;

export {};
