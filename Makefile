PRECOMMIT_VERSION="2.18.0"
PRECOMMIT_BIN_LOC="pre-commit.pyz"

.PHONY: pre-commit
pre-commit:
	wget -O ${PRECOMMIT_BIN_LOC} https://github.com/pre-commit/pre-commit/releases/download/v${PRECOMMIT_VERSION}/pre-commit-${PRECOMMIT_VERSION}.pyz
	python3 ${PRECOMMIT_BIN_LOC} install
	rm ${PRECOMMIT_BIN_LOC}


.PHONY: pre-commit-run-all
pre-commit-run-all:
	wget -O ${PRECOMMIT_BIN_LOC} https://github.com/pre-commit/pre-commit/releases/download/v${PRECOMMIT_VERSION}/pre-commit-${PRECOMMIT_VERSION}.pyz
	python3 ${PRECOMMIT_BIN_LOC} run --all-files
	rm ${PRECOMMIT_BIN_LOC}
