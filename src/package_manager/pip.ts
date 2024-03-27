import * as im from "@actions/exec/lib/interfaces"; // eslint-disable-line no-unused-vars
import * as path from "path";
import * as utils from "../utils";

const pipPackages: string[] = [
	"argcomplete",
	"colcon-bash==0.4.2",
	"colcon-cd==0.1.1",
	"colcon-cmake==0.2.27",
	"colcon-common-extensions==0.3.0",
	"colcon-core==0.15.1",
	"colcon-coveragepy-result==0.0.8",
	"colcon-defaults==0.2.7",
	"colcon-lcov-result==0.5.0",
	"colcon-library-path==0.2.1",
	"colcon-meson==0.4.2",
	"colcon-metadata==0.2.5",
	"colcon-mixin==0.2.2",
	"colcon-notification==0.2.15",
	"colcon-output==0.2.12",
	"colcon-package-information==0.3.3",
	"colcon-package-selection==0.2.10",
	"colcon-parallel-executor==0.2.4",
	"colcon-pkg-config==0.1.0",
	"colcon-powershell==0.3.7",
	"colcon-python-setup-py==0.2.7",
	"colcon-recursive-crawl==0.2.1",
	"colcon-ros==0.3.23",
	"colcon-test-result==0.3.8",
	"coverage",
	"cryptography",
	"empy<4",
	"flake8<3.8",
	"flake8-blind-except",
	"flake8-builtins",
	"flake8-class-newline",
	"flake8-comprehensions",
	"flake8-deprecated",
	"flake8-docstrings",
	"flake8-import-order",
	"flake8-quotes",
	"ifcfg",
	"importlib-metadata==2.*",
	"importlib-resources",
	"lark-parser",
	"mock",
	"mypy",
	"nose",
	"numpy",
	"pep8",
	"pydocstyle",
	"pyopenssl",
	"pyparsing",
	"pytest",
	"pytest-cov",
	"pytest-mock",
	"pytest-repeat",
	"pytest-rerunfailures",
	"pytest-runner",
	"setuptools<60.0",
	"wheel",
];

const pipCommandLine: string[] = ["pip", "install", "--upgrade"];

/**
 * Run python pip install on a list of specified packages.
 *
 * @param   packages        list of pip packages to be installed
 * @param   run_with_sudo   whether to prefix the command with sudo
 * @returns Promise<number> exit code
 */
export async function runpythonPipInstall(
	packages: string[],
	run_with_sudo: boolean = true,
): Promise<number> {
	const args = pipCommandLine.concat(packages);
	// Set CWD to root to avoid running 'pip install' in directory with setup.cfg file
	const options: im.ExecOptions = {
		cwd: path.sep,
	};
	if (run_with_sudo) {
		return utils.exec("sudo", pipCommandLine.concat(packages), options);
	} else {
		return utils.exec(args[0], args.splice(1), options);
	}
}

/**
 * Run python pip install on a list of specified packages.
 *
 * @param   run_with_sudo   whether to prefix the command with sudo
 * @returns Promise<number> exit code
 */
export async function installpythonDependencies(
	run_with_sudo: boolean = true,
	packages: string[] = pipPackages,
): Promise<number> {
	if (packages.length === 0) {
		return 0;
	}
	return runpythonPipInstall(packages, run_with_sudo);
}
